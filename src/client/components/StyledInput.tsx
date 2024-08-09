import { ChangeEventHandler } from 'react'

interface StyledInputProps {
    label: string
    htmlId: string
    value: string
    onChange?: ChangeEventHandler
}

function StyledInput({ label, htmlId, value, onChange }: StyledInputProps) {
    return (
        <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor={htmlId}>
                {label}:
            </label>
            <input
                style={styles.input}
                id={htmlId}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

const styles = {
    inputContainer: {
        marginBottom: '1rem',
    },
    label: {
        display: 'inline-block',
        marginBottom: '.5rem',
    },
    input: {
        display: 'block',
        backgroundColor: 'gray',
        lineHeight: '1.5rem',
        borderRadius: '.5rem',
        border: '1px solid darkgray',
        padding: '.25rem .75rem',
        outline: 0,
    },
}

export default StyledInput
