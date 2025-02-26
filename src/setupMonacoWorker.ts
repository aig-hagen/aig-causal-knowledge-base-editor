// Importing `monaco-editor` does some setup when importing.
// So do not remove it, even it is not used.
import 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

self.MonacoEnvironment = {
	getWorker(_: string, label: string) {
		if (label === 'json') {
			return new jsonWorker();
    }
		return new editorWorker();
	}
};

// monaco.languages.json.jsonDefaults.setEagerModelSync(true)
