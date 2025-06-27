import { useState, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Stack,
  Divider,
  Alert,
} from '@mui/material';
import { saveToStorage, getFromStorage } from '../utils/localStorage';

const PROFILE_KEY = 'userProfile';

const initialProfile = {
  name: 'Sristi Mazumder',
  email: 'sristimazumder2835@gmail.com',
  phone: '9876543210',
  role: 'Admin',
  bio: 'Aspiring full-stack developer passionate about AI, UI/UX and solving real-world problems.',
  avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
  joinedAt: '2024-01-01',
};

const Profile = () => {
  const [profile, setProfile] = useState(() => getFromStorage(PROFILE_KEY, initialProfile));
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(form);
    saveToStorage(PROFILE_KEY, form);
    setEdit(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar src={profile.avatar} sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography variant="h5">{profile.name}</Typography>
          <Typography variant="body2" color="text.secondary">{profile.role}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {success && <Alert severity="success" sx={{ mb: 2 }}>Profile updated successfully!</Alert>}

        {edit ? (
          <Stack spacing={2}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth />
            <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth />
            <TextField label="Role" name="role" value={form.role} onChange={handleChange} fullWidth />
            <TextField label="Avatar URL" name="avatar" value={form.avatar} onChange={handleChange} fullWidth />
            <TextField
              label="Bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!form.email || !form.name}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEdit(false)}>Cancel</Button>
            </Box>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Typography variant="body1"><b>Email:</b> {profile.email}</Typography>
            <Typography variant="body1"><b>Phone:</b> {profile.phone}</Typography>
            <Typography variant="body1"><b>Role:</b> {profile.role}</Typography>
            <Typography variant="body1"><b>Bio:</b> {profile.bio}</Typography>
            <Typography variant="body2" color="text.secondary">
             
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setEdit(true)}>Edit Profile</Button>
            </Box>
          </Stack>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
