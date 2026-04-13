import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('sqlalchemyrepr.reprgenerate', () => {
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
			vscode.window.showInformationMessage(classInputBox.value);
		});

		paramInputBox.onDidAccept(() => {
			paramInputBox.hide();
			
			const value = paramInputBox.value.split(",").map((value) => value.trim());
			const className = classInputBox.value.trim();
			
			const result = className + "(" + value.map(
				(value) => value + "={self." + value + "!r}"
			).join(", ") + ")";

			vscode.window.showInformationMessage("Done! Inserted " + result + " into your text editor.");
			vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(result));
		});
		
		classInputBox.show();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
