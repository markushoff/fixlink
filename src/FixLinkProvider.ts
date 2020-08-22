import * as vscode from 'vscode';

export interface IFixLinkTarget {
    name: string;
    url: string;
    regexp: string;
    urlParameter: string;
    maxParamLength: number;
  }

export class FixLinkProvider implements vscode.CodeActionProvider {

    private commandId: string = 'fixlink.showSolutionProposal';
    targets: IFixLinkTarget[];

    constructor(context: vscode.ExtensionContext){
        const command = vscode.commands.registerCommand(this.commandId, this.showSolutionProposal, this);
        context.subscriptions.push(command);
        const config = vscode.workspace.getConfiguration();
        this.targets = config.get<IFixLinkTarget[]>('fixlink.targets', []);
        this.targets.forEach(t => t.maxParamLength === undefined ? 1000 : t.maxParamLength);
    }

    public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.ProviderResult<(vscode.Command | vscode.CodeAction)[]> {
        let diagnostic: vscode.Diagnostic = context.diagnostics[0];
        if (!diagnostic.range.contains(range)) {
            return;
        }

        //show fixlink only if the regexp found a match in the problem description
        return this.targets.filter( obj => {
            return (diagnostic.message.match(obj.regexp) != null);
        }).map( t => {
                return {
                    title: t.name,
                    command: this.commandId,
                    arguments: [diagnostic, document.languageId, t]
                };
        });
    }
    
    private showSolutionProposal(diagnostic: vscode.Diagnostic, languageId: string, fixLink: IFixLinkTarget) {
        let urlParameter = fixLink.urlParameter;
        urlParameter = urlParameter
            .replace(/\$\{languageId\}/g, `${languageId}`)
            .replace(/\$\{code\}/g, `${diagnostic.code}`)
            .replace(/\$\{message\}/g, `${diagnostic.message.substr(0, fixLink.maxParamLength)}`);
        
        if(fixLink.regexp !== undefined)
        {
            var match = diagnostic.message.match(fixLink.regexp);
            if(match){
                urlParameter = urlParameter.replace(/\$\{regexp_match\}/g, `${match[1]}`)
            }  
        }     
        
        vscode.env.openExternal(vscode.Uri.parse(fixLink.url + urlParameter));
    }

}