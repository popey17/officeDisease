type HtmlTextProps = {
  html: string
  className?: string
  tag?: 'p' | 'span' | 'div' | 'h2' | 'li' | 'blockquote'
}

export function HtmlText({
  html,
  className,
  tag: Tag = 'span',
}: HtmlTextProps) {
  return (
    <Tag
      className={className ? `rich-text ${className}` : 'rich-text'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
