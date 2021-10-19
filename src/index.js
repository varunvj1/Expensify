import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import "./index.css"

import { Provider } from "./context/context"
import { SpeechProvider } from "@speechly/react-client"

ReactDom.render(
    <SpeechProvider appId="1721d9c5-de88-4d51-a5cd-3f58f74880b3" language="en-US">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>, document.getElementById('root'))