import React from 'react'

export function FileCollectionDescription(): JSX.Element {
  return (
    <div style={{ paddingRight: '12px' }}>
      <div style={{ lineHeight: '1.5rem', fontSize: '1.2rem' }}>
        <div style={{ color: '#c72051' }}>
          {/* JSX content */}
        </div>
        Faça upload de arquivos para uso em páginas, links e outros conteúdos.{' '}
      </div>
      <div style={{ color: '#c72051' }}>
        Observe que os arquivos enviados devem ter no máximo 5MB.
      </div>
    </div>
  )
}
