import { ChangeEvent, FormEvent, useState } from 'react'
import StyledInput from './StyledInput'

type issueData = {
    description: string
    link: string
    parentId: number
}

type IssueFormProps = {
    onSave: (arg0: issueData) => void
    data?: issueData
}

function IssueForm({
    onSave,
    data = { description: '', link: '', parentId: 0 },
}: IssueFormProps) {
    const [formData, setFormData] = useState(data)
    const [errors, setErrors] = useState({})

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSave({ ...formData })
        setFormData({ description: '', link: '', parentId: 0 })
    }

    const handleInputChange = (key: string) => (event: ChangeEvent) => {
        const { id, value } = event.target
        setFormData({
            ...formData,
            [key || id]: value,
        })
    }

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <StyledInput
                label="Description"
                htmlId="issueDescription"
                value={formData.description}
                onChange={handleInputChange('description')}
            />

            <StyledInput
                label="Link"
                htmlId="issueLink"
                value={formData.link}
                onChange={handleInputChange('link')}
            />

            <StyledInput
                label="Parent ID"
                htmlId="issueParentId"
                value={formData.parentId}
                onChange={handleInputChange('parentId')}
            />
            <button style={styles.button} type="submit">
                Add issue
            </button>
        </form>
    )
}

export default IssueForm

const styles = {
    form: {
        textAlign: 'left',
    },
    button: {
        borderRadius: '.5rem',
        border: '1px solid transparent',
        padding: '.6rem 1.2rem',
        fontSize: '1rem',
        fontWeight: 500,
        color: 'white',
        backgroundColor: '#1a1a1a',
        cursor: 'pointer',
    },
}
