import { useEffect, useState } from 'react'
import IssueForm from '../../components/IssueForm'
import IssueTable from '../../components/IssueTable'

type TIssue = {
    id: string
    description: string
    link: string
    parentId: string
    timestamp: string
    status: 'open' | 'closed'
}

function Issues() {
    const [issues, setIssues] = useState<TIssue[]>([])

    useEffect(() => {
        const evtSource = new EventSource('//localhost:3000/api/issues/stream')
        evtSource.onmessage = (event) => {
            const issue = JSON.parse(event.data)
            setIssues((prevState) => [...prevState, issue])
        }
        evtSource.onopen = () => {
            setIssues([])
        }

        // EXAMPLE of classical RESTful approach

        // const fetchIssues = async () => {
        //     const response = await fetch('//localhost:3000/api/issues')
        //     const data = await response.json()
        //     console.log(data)
        //     setIssues(data)
        // }
        // fetchIssues()
    }, [])

    const addIssue = async (issueData: {
        description: string
        link: string
        parentId: string
    }) => {
        const response = await fetch('//localhost:3000/api/issues', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(issueData),
        })
        const newIssue = await response.json()
        setIssues([...issues, newIssue])
    }

    const closeIssue = async (id: string) => {
        const response = await fetch(
            `//localhost:3000/api/issues/${id}/close`,
            {
                method: 'post',
            }
        )
        setIssues(
            issues.map((issue) =>
                issue.id === id ? { ...issue, status: 'closed' } : issue
            )
        )
    }

    return (
        <>
            <h1>Issue tracker</h1>
            <IssueForm onSave={addIssue} />
            <IssueTable data={issues} onCloseIssue={closeIssue} />
        </>
    )
}

export default Issues
