/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";


class CodeEditorState {
    readonly content:string;
    readonly cursorPosition:number;
    readonly unSaveChnages:boolean;

    constructor(content:string, cursorPosition:number, unSaveChanges:boolean){
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unSaveChnages = unSaveChanges;
    }

    copyWith({
        content, cursorPosition, unSaveChnages
    }:Partial<CodeEditorState>) : CodeEditorState {
        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unSaveChnages ?? this.unSaveChnages
        )
    }
    
    displayState(){
        console.log('\n%cEstado del editor:', COLORS.green);
        console.log(`
            Contenido: ${this.content}
            Cursor Pos: ${this.cursorPosition}
            Unsaved Changes: ${this.unSaveChnages}
        `)
    }

}

class CodeEditorHistory {
    private history: CodeEditorState[] = []
    private currentIndex: number = -1;

    save (state: CodeEditorState):void {

        if (this.currentIndex < this.history.length -1){
            this.history = this.history.splice(0, this.currentIndex+1);
        }

        this.history.push(state)
        this.currentIndex++
    }

    redo() : CodeEditorState | null {
        if (this.currentIndex < this.history.length - 1){
            this.currentIndex ++;
            return this.history[this.currentIndex];
        }

        return null;
    }

    undo(): CodeEditorState | null {
        if (this.currentIndex > 0){
            this.currentIndex --;
            return this.history[this.currentIndex];
        }
        
        return null;
    }

}

function main(){

    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState(
        "console.log('Hola mundo');",
        2,
        false
    );

    history.save(editorState);

    console.log('%cEstado incial', COLORS.blue);
    editorState.displayState();



    console.log('\n%cDespués del primer cambio', COLORS.blue);
    
    editorState = editorState.copyWith({
        content: "console.log('Hola mundo'); \nconsole.log('Nueva linea');",
        cursorPosition:3,
        unSaveChnages: true,
    });

    history.save(editorState);

    editorState.displayState();

    console.log('\n%cDespués de mover el cursor', COLORS.blue);
    editorState = editorState.copyWith({
        cursorPosition:5
    });

    history.save(editorState);

    editorState.displayState();

    console.log('\n%cDespués del undo', COLORS.blue);
    editorState = history.undo()!;

    editorState.displayState();

    console.log('\n%cDespués del dedo', COLORS.blue);
    editorState = history.redo()!;

    editorState.displayState();

}

main ();