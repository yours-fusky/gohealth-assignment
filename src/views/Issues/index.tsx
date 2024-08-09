import { useState } from 'react'
import IssueForm from '../../components/IssueForm'
import IssueTable from '../../components/IssueTable'

type TIssue = {
    id: number
    description: string
    link: string
}

function Issues() {
    const [issues, setIssues] = useState<TIssue[]>([])

    const addIssue = (issueData: {
        description: string
        link: string
        parentId: number
    }) => {
        setIssues([
            ...issues,
            {
                id: issues.length,
                ...issueData,
            },
        ])
    }

    return (
        <>
            <h1>Issue tracker</h1>
            <IssueForm onSave={addIssue} />
            <IssueTable data={issues} />
        </>
    )
}

export default Issues
