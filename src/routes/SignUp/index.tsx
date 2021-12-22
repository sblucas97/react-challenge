import React from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@mui/material/CircularProgress';

import api from '../../services/api';
import { useUser } from '../../context/user';
import Link from '../../components/Link';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

import Logo from '../../assets/logo';
import { User } from '../../interfaces/user.interface';
import { signUpValidationSchema } from '../../schemas/signUp';

interface FormValues {
  email?: string;
  username: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { login } = useUser();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const onSubmit = async (data: FormValues): Promise<void> => {
    try {
      const response: { token: string; user: User } = await api.post(
        '/auth/signup',
        data
      );

      if (!response) {
        throw new Error();
      }

      login({
        username: data.username,
        password: data.password,
      });
    } catch (err) {
      toast.error('Username already taken', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Box component="section" sx={{ marginTop: '214px' }}>
      <Box sx={{ display: 'flex', marginBottom: '78px' }}>
        <Logo />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '32px', color: 'primary.main' }}>
            Sign Up
          </Typography>
        </Box>
        <Box>
          <Link type="secondary" href="/signin">
            Already have an account
          </Link>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', marginBottom: '15px' }}>
        <FormField
          name="username"
          control={control}
          label="Define a username"
          error={errors.username || null}
        />
      </Box>
      <Box sx={{ display: 'flex', marginBottom: '15px' }}>
        <FormField
          name="password"
          control={control}
          label="Set your password"
          type="password"
          error={errors.password || null}
        />
      </Box>
      <Box sx={{ display: 'flex', marginBottom: '25px' }}>
        <FormField
          name="email"
          control={control}
          label="Email (optional)"
          error={errors.email || null}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {isSubmitting ? (
            <CircularProgress
              sx={{
                color: '#FFF',
                width: '23px !important',
                height: '23px !important',
              }}
            />
          ) : (
            'Create account'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
