
// If TipTapEditor is a named export, use:

// Or, if the default export is not a React component, update the export in editor.tsx to:
// export default function TipTapEditor() { ... }
import Tiptap from '@/components/Tiptap';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '#',
    },
];

export default function Question() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Questions" />
             <Tiptap />
        </AppLayout>
    );
}
