import { Button } from '../ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import katex from 'katex';

export default function MathDialog({
    open,
    type,
    value,
    onClose,
    onSave,
    setDialogValue,
}: {
    open: boolean;
    type: 'block' | 'inline' | null;
    value: string;
    onClose: () => void;
    onSave: () => void;
    setDialogValue: (value: string) => void;
}) {
    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Fórmula {type === 'block' ? 'em bloco' : 'inline'}</DialogTitle>
                    </DialogHeader>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setDialogValue(e.target.value)}
                        className="w-full rounded border px-2 py-1"
                        autoFocus
                    />

                    <div className="mt-4">
                        <p className="mb-2">Pré-visualização:</p>
                        <div className="border p-2 min-h-[40px]">
                            {type ? (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: (() => {
                                            try {
                                                // For inline, use value directly; for block, use value directly
                                                // Remove $...$ wrapping for inline, as katex expects raw LaTeX
                                                return katex.renderToString(value, {
                                                    displayMode: type === 'block',
                                                    throwOnError: false,
                                                });
                                            } catch {
                                                return '';
                                            }
                                        })(),
                                    }}
                                />
                            ) : (
                                <span className="text-muted-foreground">Nenhum tipo selecionado</span>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={onSave}>Salvar</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
