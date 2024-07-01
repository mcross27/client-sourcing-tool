import React, { useState } from 'react';
import { TextField, Button, Switch, FormControlLabel, Grid } from '@mui/material';

const EmailTemplate = () => {
    const [template, setTemplate] = useState({
        name: '',
        subjectA: '',
        bodyA: '',
        subjectB: '',
        bodyB: '',
        isABTest: false
    });

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setTemplate(prev => ({
            ...prev,
            [name]: name === 'isABTest' ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting template:', template);
        // Here you would typically send this data to your backend
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="name"
                label="Template Name"
                value={template.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={template.isABTest}
                        onChange={handleChange}
                        name="isABTest"
                    />
                }
                label="A/B Test"
            />
            <Grid container spacing={2}>
                <Grid item xs={template.isABTest ? 6 : 12}>
                    <TextField
                        name="subjectA"
                        label="Subject A"
                        value={template.subjectA}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="bodyA"
                        label="Body A"
                        value={template.bodyA}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                </Grid>
                {template.isABTest && (
                    <Grid item xs={6}>
                        <TextField
                            name="subjectB"
                            label="Subject B"
                            value={template.subjectB}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            name="bodyB"
                            label="Body B"
                            value={template.bodyB}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                )}
            </Grid>
            <Button type="submit" variant="contained" color="primary">
                Save Template
            </Button>
        </form>
    );
};

export default EmailTemplate;