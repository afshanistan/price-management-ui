import { Controls, Description, Heading, Markdown, Primary, Stories, Subtitle, Title, useOf } from '@storybook/addon-docs/blocks'

/*
  The Docs page for every component: Storybook's default layout, with the
  component's spec from design/specs/ shown after the stories, under a "Spec" heading.
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
      <Primary />
      <Controls />
      <Stories />
      {spec && (
        <>
          <Heading>Spec</Heading>
          <Markdown>{spec}</Markdown>
        </>
      )}
    </>
  )
}
