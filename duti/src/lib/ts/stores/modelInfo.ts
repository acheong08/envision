import { writable } from 'svelte/store';

export const modelInfo = writable({
    title: 'Model Title',
    description: 'Model Description',
    tags: ['tag1', 'tag2', 'tag3'],
    source: 'https://example.com/',
    readme: 'This is a model readme',
});

export const readme_src = writable('');