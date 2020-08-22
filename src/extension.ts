import * as vscode from 'vscode';
import {FixLinkProvider} from './FixLinkProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "fixlink" is now active!');
	const fixLinkActionProvider = vscode.languages.registerCodeActionsProvider(
		{scheme: 'file'},
		new FixLinkProvider(context)
	);
	context.subscriptions.push(fixLinkActionProvider);
}

export function deactivate() {}
