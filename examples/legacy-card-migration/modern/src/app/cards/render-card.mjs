export function renderMigratedCard(model, { React, Flex, Text, Link, Divider }) {
  if (!model || !Array.isArray(model.items) || model.actions?.length || model.liveWritesEnabled !== false) {
    throw new Error('Only the read-only migrated card contract is supported.');
  }
  const h = React.createElement;
  return h(Flex, { direction: 'column', gap: 'medium' },
    h(Text, null, model.title),
    model.state === 'empty' ? h(Text, null, 'No items available.') : null,
    ...model.items.map(item => {
      // Validate links again at the rendering boundary, even for saved models.
      if (item.href) {
        const url = new URL(item.href);
        if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) throw new Error('Unsafe item link.');
      }
      return h(Flex, { key: item.id, direction: 'column', gap: 'small' },
        h(Divider),
        item.href ? h(Link, { href: item.href }, item.title) : h(Text, null, item.title),
        ...item.properties.map((property, index) => h(Text, { key: index }, property.label + ': ' + property.value)));
    }));
}
