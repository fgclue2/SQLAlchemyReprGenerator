import * as vscode from 'vscode';

function magic(boilerplate: boolean = false) {
	const classInputBox = vscode.window.createInputBox();
	classInputBox.title = "SQLAlchemy __repr__() Generator (1/2)";
	classInputBox.prompt = "Type in your class name";
	classInputBox.placeholder = "GenericTableClass";

	const paramInputBox = vscode.window.createInputBox();
	paramInputBox.title = "SQLAlchemy __repr__() Generator (2/2)";
	paramInputBox.prompt = "Type in your parameters separated by commas";
	paramInputBox.placeholder = "id, name, email";

	classInputBox.onDidAccept(() => {
		classInputBox.hide();
		paramInputBox.show();
	});

	paramInputBox.onDidAccept(() => {
		paramInputBox.hide();

		const value = paramInputBox.value.split(",").map((value) => value.trim());
		const className = classInputBox.value.trim();

		const result = className + "(" + value.map(
			(value) => value + "={self." + value + "!r}"
		).join(", ") + ")";

		vscode.window.showInformationMessage("Done! Inserted " + result + " into your text editor.");
		if(boilerplate) {
			vscode.window.activeTextEditor?.insertSnippet(
				new vscode.SnippetString("def __repr__(self) -> str:\n\t" + "return f\"" + result + "\"")
			);
		} else {
			vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(result));
		}
	});

	classInputBox.show();
}

export function activate(context: vscode.ExtensionContext) {
	const simple = vscode.commands.registerCommand('sqlalchemyrepr.reprgenerate', () => {
		magic();
	});
	const boiler = vscode.commands.registerCommand('sqlalchemyrepr.boilergenerate', () => {
		magic(true);
	});

	context.subscriptions.push(boiler);
}

// This method is called when your extension is deactivated
export function deactivate() { }
