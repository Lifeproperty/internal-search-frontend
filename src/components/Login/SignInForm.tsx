import * as React from "react";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/config/firebase";
import {Alert, AlertTitle} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";

type FormValues = {
    email: string
    password: string
}
export const SignInForm = () => {
    const router = useRouter();
    const {register, handleSubmit, setError, formState: {errors,}, trigger} = useForm<FormValues>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const isValid = await trigger();
        if (isValid) {
            try {
                setErrorMessage("");
                setLoading(true);
                const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
                console.log(userCredential)
                router.push("/");
            } catch (err) {
                setError("email", {message: ""});
                setError("password", {message: ""});
                setErrorMessage("Email or password is incorrect.");
            } finally {
                setLoading(false);
            }
        }

    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                    <TextField
                        required
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        {...register("email", {
                            required: "This field is required", pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email is not valid",
                            }
                        })}
                    />
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}

                        label="Password"
                        type="password"
                        id="password"
                        {...register("password", {required: "This field is required"})}
                    />

                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={loading}
                        sx={{mt: 3, mb: 2}}
                        loadingPosition="start"
                        variant="contained"
                        startIcon={<LoginIcon/>}
                    >
                        Sign In
                    </LoadingButton>

                    {errorMessage && (
                        <Alert severity="error" className={"mt-4"}>
                            <AlertTitle>Error</AlertTitle>
                            {errorMessage}

                        </Alert>
                    )}
                    {/*<Grid container>*/}
                    {/*    <Grid item xs>*/}
                    {/*        <Link href="#" variant="body2">*/}
                    {/*            Forgot password?*/}
                    {/*        </Link>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item>*/}
                    {/*        <Link href="#" variant="body2">*/}
                    {/*            {"Don't have an account? Sign Up"}*/}
                    {/*        </Link>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Box>
            </Box>
        </Container>
    );
};
