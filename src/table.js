import React from "react" 
import "./index.css"

function Table (props) {
    const tab=props.xyz
    return tab.map((st) =>
        <table>
            <tr>
                <td>{st.cond ? st.name : " "}</td>
                <td>{st.country}</td>
            </tr>
        </table>

    )
}

export default Table 