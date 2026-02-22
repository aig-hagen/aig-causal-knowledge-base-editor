/*
 * Causal Knowledge Base Editor - A graphical application to reason with causal knowledge.
 *
 * Copyright (C) 2026  Artificial Intelligence Group at the Faculty of Mathematics and Computer Science of the FernUniversität in Hagen <https://www.fernuni-hagen.de/aig/en/>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { ref, watch, watchEffect, type WatchHandle } from 'vue'

export function computedIfActive<ResultT>(isActive: () => boolean, getter: () => ResultT) {
  const result = ref<ResultT | null>(null)

  let resultWatcher: WatchHandle | undefined

  watch(
    isActive,
    (isActive) => {
      if (isActive) {
        if (resultWatcher === undefined) {
          resultWatcher = watchEffect(() => {
            result.value = getter()
          })
        } else {
          resultWatcher.resume()
        }
      } else {
        resultWatcher?.pause()
      }
    },
    { immediate: true },
  )

  return result
}
