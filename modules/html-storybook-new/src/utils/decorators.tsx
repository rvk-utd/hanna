import type { Decorator } from '@storybook/react';

import { cssImportDecorator } from './cssImportDecorator.js';

export const decorators: Array<Decorator> = [cssImportDecorator];
