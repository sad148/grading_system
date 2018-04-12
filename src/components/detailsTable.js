import React from 'react';

const DetailsTables = (props) => {
    console.log(props)
    if (props.data == undefined)
        return (
            <div>
            </div>
        )
    else {
        return (
            <div style={{overflowY: "auto"}}>
                <table border="1">
                    <tr>
                        <th style={{textAlign: "left"}}>Name</th>
                        {(props.type.toUpperCase() === "GRADERS" || props.type.toUpperCase() === "ASSIGNMENTS") ?
                            <th style={{textAlign: "left"}}>Action</th> : null}
                    </tr>
                    {
                        props.data.map((item) => {
                            return (<tr>
                                    <td>{item.name}</td>
                                    {(props.type.toUpperCase() === "GRADERS" || props.type.toUpperCase() === "ASSIGNMENTS") ?
                                        <td style={{textAlign: "left"}}>< input type="submit"
                                                                                style={{padding: "10px", width: "13%"}}
                                                                                onClick={() => props.func(item.name)}/>
                                        </td> : null
                                    }
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        )
    }
}

export default DetailsTables;