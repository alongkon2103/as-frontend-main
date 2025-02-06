"use client";

import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Container,
  Link,
  Grid,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  LoginRequest,
  LoginRequestData,
} from "@/store/features/Auth/AuthSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {" Made by "}
      <Image src="/nfq.svg" width={47} height={14} alt="NFQ logo" />
    </Typography>
  );
}

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en"); // ["en", "th"]
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestdata: LoginRequestData = {
      employeeId: data.get("username"),
      password: data.get("password"),
    };
    if (requestdata.employeeId === "" || requestdata.password === "") {
      toast.error("Invalid credential");
    } else {
      setIsLoading(true);
      await dispatch(LoginRequest(requestdata));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLanguageChange = (e: any) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "30px",
          paddingRight: "30px",
        }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Age"
          onChange={handleLanguageChange}
          size="small"
        >
          <MenuItem value={"en"}>
            <Typography>EN</Typography>
          </MenuItem>
          <MenuItem value={"th"}>
            <Typography>TH</Typography>
          </MenuItem>
        </Select>
      </Box>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "80dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src="/logo.svg"
            width={367}
            height={220}
            alt="seniort-th-logo"
          />
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={t("username")}
              name="username"
              autoComplete="Username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              sx={{ mt: 3, mb: 2 }}
              id="signin"
            >
              {t("sign_in")}
            </LoadingButton>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Link href="#" variant="body1" align="center">
                {t("trouble_loggin_in")}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          height: "10dvh",
        }}
      >
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Grid>
    </>
  );
}
