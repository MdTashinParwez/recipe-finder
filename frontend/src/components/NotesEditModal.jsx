import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const NotesEditModal = ({ open, onClose, recipe, onSave }) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (recipe) {
      setNotes(recipe.notes || '');
    }
  }, [recipe]);

  const handleSave = () => {
    onSave(recipe.idMeal, notes);
  };

  if (!recipe) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Notes - {recipe.strMeal}</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          margin="dense"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotesEditModal;