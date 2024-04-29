export const validateResume = (file) => {
    if (!file) {
        return { isValid: false, errorMessage: 'Please select a file.' };
    }

    const allowedFormats = ['.pdf', '.docx'];
    const fileExtension = file.name.slice(file.name.lastIndexOf('.'));
    if (!allowedFormats.includes(fileExtension)) {
        return { isValid: false, errorMessage: 'Please select a PDF or DOCX file.' };
    }

    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
        return { isValid: false, errorMessage: 'File size exceeds the limit (10MB).' };
    }

    return { isValid: true, errorMessage: '' };
};
