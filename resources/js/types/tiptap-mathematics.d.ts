// types/tiptap-mathematics.d.ts
import '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mathematics: {
      /**
       * Insert inline math
       */
      insertInlineMath: (options?: { latex?: string }) => ReturnType
      /**
       * Set inline math
       */
      setInlineMath: () => ReturnType
      /**
       * Delete inline math
       */
      deleteInlineMath: () => ReturnType
      /**
       * Update inline math
       */
      updateInlineMath: (options: { latex: string }) => ReturnType
      /**
       * Insert block math
       */
      insertBlockMath: (options?: { latex?: string }) => ReturnType
      /**
       * Set block math
       */
      setBlockMath: () => ReturnType
      /**
       * Delete block math
       */
      deleteBlockMath: () => ReturnType
      /**
       * Update block math
       */
      updateBlockMath: (options: { latex: string }) => ReturnType
    }
  }
}