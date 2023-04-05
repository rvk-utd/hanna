declare module '@bramus/pagination-sequence' {
  function generate(
    curPage: number,
    numPages: number,
    numPagesAtEdges = 2,
    numPagesAroundCurrent = 2,
    glue = '…'
  ): Array<number | string>;

  type GenerateOptions = {
    curPage?: number;
    numPages?: number;
    numPagesAtEdges?: number;
    numPagesAroundCurrent?: number;
    glue?: string;
  };

  function generateFromObj(opts: GenerateOptions): Array<string | number>;

  export { generate, generateFromObj };
}
