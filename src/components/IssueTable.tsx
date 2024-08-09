function IssueTable({ data }) {
    return (
        <div style={{ width: '80vw' }}>
            <h2>Issues Table</h2>
            {!data.length ? (
                <p>No issues</p>
            ) : (
                <table style={{ width: '100%' }}>
                    <thead style={{ fontWeight: 600 }}>
                        <td>Id</td>
                        <td>Description</td>
                        <td>Link</td>
                        <td>Parent ID</td>
                    </thead>
                    <tbody>
                        {data.map((row) => {
                            return (
                                <tr>
                                    <td>{row.id}</td>
                                    <td>{row.description}</td>
                                    <td>{row.link}</td>
                                    <td>{row.parentId}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default IssueTable
