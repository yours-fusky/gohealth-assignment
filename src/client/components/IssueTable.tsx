import moment from 'moment'

function IssueTable({ data, onCloseIssue }) {
    return (
        <div style={{ width: '80vw' }}>
            <h2>Issues Table</h2>
            {!data.length ? (
                <p>No issues</p>
            ) : (
                <table style={{ width: '100%' }}>
                    <thead style={{ fontWeight: 600 }}>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Parent ID</th>
                            <th>Status</th>
                            <th>CreationTimestamp</th>
                            <th>Link</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => {
                            return (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.description}</td>
                                    <td>{row.parentId}</td>
                                    <td>{row.status}</td>
                                    <td>{row.link}</td>
                                    <td>
                                        {moment(Number(row.timestamp)).format(
                                            'LLL'
                                        )}
                                    </td>
                                    <td>
                                        {row.status === 'open' && (
                                            <button
                                                onClick={() => {
                                                    onCloseIssue(row.id)
                                                }}
                                            >
                                                Close
                                            </button>
                                        )}
                                    </td>
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
