import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@mui/material'

function MyDocument() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

MyDocument.getInitialProps = async (ctx) => {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CssBaseline.flush()
    return ({ ...initialProps, styles: ( <> {initialProps.styles} {styles} </> ) })
}

export default MyDocument
