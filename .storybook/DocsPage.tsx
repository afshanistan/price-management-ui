import { Controls, Description, Markdown, Primary, Stories, Subtitle, Title, useOf } from '@storybook/addon-docs/blocks'

/*
  The Docs page for every component: Storybook's default layout, with the
  component's spec from design/specs/ shown between the description and the stories.
  A story file passes its spec as `parameters.spec`, imported raw
  (`import spec from '…/design/specs/button.md?raw'`), so the page
  updates whenever the spec changes. Without a spec, the default layout shows.
*/
export function DocsPage() {
  const { preparedMeta } = useOf('meta', ['meta'])
  const spec = preparedMeta.parameters.spec as string | undefined

  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      {spec && <Markdown>{spec}</Markdown>}
      <Primary />
      <Controls />
      <Stories />
    </>
  )
}
