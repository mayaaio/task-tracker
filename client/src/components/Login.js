import {
    Button,
    Container, Paper, TextInput, Title, Text, Stack, Anchor, Group
  } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { config } from '../constants';
const Login = () =>  {
    const navigate = useNavigate();
    const URL = config.url;
    const auth = useAuth()
    const [signIn, setSignIn] = useState(true) 
    
    const onLogin = async () => {
          try {
            await auth.logIn(form.values.name)
            navigate("/")
          } catch(err) {
            console.log(err)
            form.setFieldError('name', String(err));
          }
      }

    const onSignUp = useMutation({
        mutationFn: async ( ) => {
            const response = await fetch(`${URL}/tasks/signUp?name=${form.values.name}`, {
                method: "POST",
            })
            return response
        },
        onSuccess: async () => {
            await onLogin()
        }
    })

    const form = useForm({
        initialValues: {
            name: ''
        },
        validate: {
            name: (value) => (value.length < 1 ? 'Name must have at least 1 letter' : null),
        }
    })
  
    return (
        <Container size={420} my={40}>
            <Title pb='sm'>Welcome!</Title>
            <form onSubmit={form.onSubmit(() => signIn ? onLogin() : onSignUp.mutate())}>
                <Paper withBorder shadow="md" p={30}>
                    <Stack>
                        <Text>{signIn ? 'Log in with name' : 'Create an account with name'}</Text>
                        <TextInput 
                            withAsterisk 
                            label="Name" 
                            placeholder="Your name"
                            {...form.getInputProps('name')}/>
                    </Stack>
                    <Group pt='md' align='center' position="apart">
                        <Anchor fs="italic" fz='xs' onClick={() => {
                            setSignIn(!signIn)
                            form.clearFieldError('name');
                        }} >
                            {signIn ? 'Click to sign up' : 'Have an account? Login'}
                            </Anchor>
                        <Button maw={200} type="submit">{signIn ? 'Log in' : 'Create account'}</Button>
                    </Group>
                </Paper>
            </form>  
        </Container>
    )
}

export default Login;