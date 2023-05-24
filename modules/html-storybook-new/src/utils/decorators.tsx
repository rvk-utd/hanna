import type { Decorator } from '@storybook/react';

import { cssImportDecorator } from './cssImportDecorator.js';
import { layoutDecorator } from './layoutDecorator.js';

export const decorators: Array<Decorator> = [cssImportDecorator, layoutDecorator];
