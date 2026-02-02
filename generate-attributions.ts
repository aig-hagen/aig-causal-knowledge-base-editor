#!/usr/bin/env node

import checker, { type ModuleInfo, type InitOpts, type ModuleInfos } from 'license-checker'
import { readFile, writeFile, readdir } from 'fs/promises'
import { type Attribution } from './src/modules/third-party-licenses/types.ts'

const GRAPH_COMPONENT_VERSION = await getVersionFromDirName(
  'third-party/aig-hagen/aig_graph_component',
)
const XAI_CA_VERSION = await getVersionFromDirName('third-party/xai-ca/xray')

// Same as:
// npx license-checker --excludePrivatePackages \
//  --onlyAllow 'MIT;BSD-3-Clause;Apache-2.0;ISC;Python-2.0;CC-BY-4.0;BSD-2-Clause;BlueOak-1.0.0;Unlicense;CC0-1.0;CC-BY-3.0;0BSD' \
//  --json
//
const options: InitOpts = {
  start: '.',
  excludePrivatePackages: true,
  onlyAllow:
    'MIT;BSD-3-Clause;Apache-2.0;ISC;Python-2.0;CC-BY-4.0;BSD-2-Clause;BlueOak-1.0.0;Unlicense;CC0-1.0;CC-BY-3.0;0BSD',
}
checker.init(options, (err, packages) => {
  if (err) {
    throw err
  } else {
    writeAttributionsJson(packages)
  }
})

async function writeAttributionsJson(packages: ModuleInfos) {
  const attributions = [
    ...(await attributionsForNonNpmPackages()),
    ...(await attributionsForNpmPackages(packages)),
  ]
  await writeFile('third-party/attribution.json', JSON.stringify(attributions, null, 2), 'utf8')
}

// Keep updated with file:///./README.md#acknowledgment
async function attributionsForNonNpmPackages(): Promise<Attribution[]> {
  return [
    {
      name: 'TweetyProject',
      license: 'LGPL-3.0-only',
      repository: 'https://github.com/TweetyProjectTeam/TweetyProject',
      publisher: 'Matthias Thimm and other contributors',
      licenseText: await readFile(
        'third-party/TweetyProjectTeam/TweetyProject/230c69b/lgpl_license.txt',
        'utf8',
      ),
    },
    {
      scope: 'aig-hagen',
      name: 'graph-component',
      version: GRAPH_COMPONENT_VERSION,
      license: 'MIT',
      publisher: 'Artificial Intelligence Group of the University of Hagen',
      repository: 'https://github.com/aig-hagen/aig_graph_component',
      licenseText: await readFile(
        `third-party/aig-hagen/aig_graph_component/${GRAPH_COMPONENT_VERSION}/LICENSE.md`,
        'utf8',
      ),
    },
    {
      name: 'Argumentation Framework eXplanation, Reasoning, and AnalYsis',
      version: GRAPH_COMPONENT_VERSION,
      license: 'MIT',
      repository: 'https://github.com/xai-ca/xray',
      publisher: 'University of Illinois Urbana-Champaign',
      licenseText: await readFile(`third-party/xai-ca/xray/${XAI_CA_VERSION}/LICENSE`, 'utf8'),
    },
  ]
}

async function getVersionFromDirName(base: string) {
  const entries = await readdir(base, { withFileTypes: true })
  if (entries.length != 1 || !entries[0].isDirectory()) {
    throw new Error(`Unexpected file system entries ${JSON.stringify(entries)}`)
  }
  return entries[0].name
}

async function attributionsForNpmPackages(packages: ModuleInfos): Promise<Attribution[]> {
  const attributions = []

  for (const [packageName, info] of Object.entries(packages)) {
    const attribution = await attributionsForNpmPackage(packageName, info)
    attributions.push(attribution)
  }

  return attributions
}

async function attributionsForNpmPackage(
  packageName: string,
  info: ModuleInfo,
): Promise<Attribution> {
  let scope
  let name
  let version
  const fullNameParts = packageName.split('@')
  // e.g. @acemir/cssom@0.9.29
  if (fullNameParts.length === 3 && fullNameParts[0] == '') {
    const nameParts = fullNameParts[1].split('/')
    if (nameParts.length != 2) {
      throw new Error(`Unexpected package name: ${packageName}`)
    }
    scope = nameParts[0]
    name = nameParts[1]
    version = fullNameParts[2]
    // e.g. dom-serializer@2.0.0
  } else if (fullNameParts.length === 2) {
    name = fullNameParts[0]
    version = fullNameParts[1]
  } else {
    throw new Error(`Unexpected full package name: ${packageName}`)
  }

  if (info.licenses === undefined || Array.isArray(info.licenses)) {
    throw new Error(`Invalid license in ${JSON.stringify(info)} for ${packageName}`)
  }

  const repository = getRepository(packageName, info)

  let licenseText
  if (
    info.licenseFile !== undefined &&
    (info.licenseFile.endsWith('LICENCE') ||
      info.licenseFile.endsWith('LICENCE.md') ||
      info.licenseFile.endsWith('LICENSE') ||
      info.licenseFile.endsWith('LICENSE.md') ||
      info.licenseFile.endsWith('LICENSE.txt') ||
      info.licenseFile.endsWith('LICENSE.BSD') ||
      info.licenseFile.endsWith('LICENSE-MIT') ||
      info.licenseFile.endsWith('LICENSE-MIT.txt') ||
      info.licenseFile.endsWith('license') ||
      info.licenseFile.endsWith('license.md') ||
      info.licenseFile.endsWith('license.txt') ||
      info.licenseFile.endsWith('license-cc0') ||
      info.licenseFile.endsWith('node_modules/spdx-exceptions/README.md'))
  ) {
    licenseText = await readFile(info.licenseFile, 'utf-8')
  } else {
    licenseText = await fetchLicense(packageName, version, info)
  }

  return {
    scope: scope,
    name: name,
    version: version,
    license: info.licenses,
    repository: repository,
    home: repository,
    publisher: info.publisher,
    licenseText: licenseText,
  }
}

function getRepository(packageName: string, info: ModuleInfo): string {
  if (info.repository !== undefined) {
    return info.repository
  }

  if (packageName.startsWith('rettime@')) {
    return 'https://github.com/kettanaito/rettime'
  }

  throw new Error(`No repository for ${packageName} with ${JSON.stringify(info)}`)
}

async function fetchLicense(
  packageName: string,
  version: string,
  info: ModuleInfo,
): Promise<string | null> {
  if (info.repository === undefined || !info.repository.startsWith('https://github.com')) {
    throw new Error('Can only fetch licenses from GitHub.')
  }
  let url
  if (packageName.startsWith('@pkgr/core@')) {
    url = `https://raw.githubusercontent.com/un-ts/pkgr/refs/tags/%40pkgr/core%40${version}/LICENSE`
  } else if (packageName.startsWith('@vue/devtools-api@')) {
    url = `https://raw.githubusercontent.com/vuejs/devtools-v6/refs/tags/v${version}/LICENSE`
  } else if (packageName.startsWith('@bufbuild/protobuf@')) {
    url = `https://raw.githubusercontent.com/bufbuild/protobuf-es/refs/tags/v${version}/LICENSE`
  } else if (packageName.startsWith('@esbuild/linux-x64@')) {
    url = `https://raw.githubusercontent.com/evanw/esbuild/refs/tags/v${version}/LICENSE.md`
  } else if (packageName.startsWith('@inquirer/ansi@')) {
    url = `https://raw.githubusercontent.com/SBoudrias/Inquirer.js/refs/tags/v${version}/LICENSE-MIT`
  } else if (packageName === '@open-draft/deferred-promise@2.2.0') {
    return null
  } else if (packageName.startsWith('@polka/url@')) {
    url = `https://raw.githubusercontent.com/lukeed/polka/refs/tags/v${version}/license`
  } else if (packageName.startsWith('@rollup/rollup-linux-x64-')) {
    url = `https://raw.githubusercontent.com/rollup/rollup/refs/tags/v${version}/LICENSE.md`
  } else if (packageName === 'boolbase@1.0.0') {
    url = `https://raw.githubusercontent.com/fb55/boolbase/refs/heads/master/LICENSE`
  } else if (packageName === 'eastasianwidth@0.2.0') {
    url = `https://raw.githubusercontent.com/komagata/eastasianwidth/refs/heads/master/MIT-LICENSE.txt`
  } else if (packageName === 'esrecurse@4.3.0') {
    url = `https://raw.githubusercontent.com/estools/esrecurse/refs/heads/master/LICENSE.md`
  } else if (packageName.startsWith('imurmurhash@0.1.4')) {
    url = `https://raw.githubusercontent.com/jensyt/imurmurhash-js/refs/tags/${version}/LICENSE`
  } else if (packageName === 'is-node-process@1.2.0') {
    return null
  } else if (packageName === 'keyv@4.5.4') {
    url = 'https://raw.githubusercontent.com/jaredwray/keyv/refs/heads/main/LICENSE'
  } else if (packageName.startsWith('markdown-it-anchor@')) {
    url = `https://raw.githubusercontent.com/valeriangalliat/markdown-it-anchor/refs/tags/v${version}/UNLICENSE`
  } else if (packageName === 'natural-compare@1.4.0') {
    url = `https://lauri.rooden.ee/mit-license.txt`
  } else if (packageName.startsWith('sass-embedded-linux-')) {
    url = `https://raw.githubusercontent.com/sass/embedded-host-node/refs/tags/${version}/LICENSE`
  } else if (packageName.startsWith('saxes@')) {
    url = `https://raw.githubusercontent.com/lddubeau/saxes/refs/tags/v${version}/LICENSE`
  } else if (packageName.startsWith('sirv@3')) {
    url = `https://raw.githubusercontent.com/lukeed/sirv/refs/tags/v${version}/license`
  } else if (packageName === 'spdx-license-ids@3.0.22') {
    url = 'https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt'
  } else if (packageName === 'stackback@0.0.2') {
    return null
  } else if (packageName === 'strict-event-emitter@0.5.1') {
    return null
  } else if (packageName === 'varint@6.0.0') {
    return null
  } else if (packageName === 'vitest-browser-vue@2.0.2') {
    return null
  } else {
    throw new Error(`No license file for ${packageName} with ${JSON.stringify(info)}`)
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed response ${JSON.stringify(response)}`)
  }
  return await response.text()
}
