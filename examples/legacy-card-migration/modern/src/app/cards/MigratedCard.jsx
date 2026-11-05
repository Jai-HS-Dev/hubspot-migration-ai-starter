import React from 'react';
import { hubspot, Flex, Text, Link, Divider } from '@hubspot/ui-extensions';
import { renderMigratedCard } from './render-card.mjs';
import { model } from './synthetic-model.mjs';

// Static synthetic data only. Preserve and secure the original backend separately.
hubspot.extend(() => renderMigratedCard(model, { React, Flex, Text, Link, Divider }));
