# WAT ??

This folder contains modules that handle importing CommonJs format
dependencies that mix default and named exports.

Those sort of shenanigans can throw off both Node.js and some JS bundlers,
when operating in ESM mode...

As the hanna-\* modules are publieshed as dual-format (ESM and CJS) libraries,
we need to make sure they import these legacy modules in the safest way
possible.
