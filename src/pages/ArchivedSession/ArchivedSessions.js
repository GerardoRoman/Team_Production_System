import { Box, Grid, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ArchivedSessions({ token, pk, setAuth }) {
const [archivesessions, setArchiveSessions] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/archivesession/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(res.data)
        setArchiveSessions(res.data)
        console.log(archivesessions)
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [token, pk]);

  return (
    <Box className="archivedsessions--page">
      <Typography
        variant="h2"
        component="div"
        sx={{ flexGrow: 1, marginTop: "4rem", padding: "1rem" }}
      >
        Past Sessions:
      </Typography>
      <Box margin={"1rem"}>
        <hr style={{ color: "black" }} />
      </Box>
      <Box>
        <Grid
          container
          sx={{
            flexGrow: 1,
            marginLeft: "1rem",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          <Grid item xs={3}>
            <Box>Name:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Date:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Time:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Status:</Box>
          </Grid>
        </Grid>
        {archivesessions.map((session) => 
            <Grid
              container
              key={archivesessions.pk}
              sx={{
                flexGrow: 1,
                marginLeft: "1rem",
                marginTop: "1.75rem",
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              <Grid item xs={3}>
                {
                  <Box>
                    {archivesessions.mentor_first_name} {archivesessions.mentor_last_name}
                  </Box>
                }
              </Grid>
              <Grid item xs={3}>
                <Box>{new Date(archivesessions.start_time).toLocaleDateString()}</Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  {new Date(archivesessions.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(archivesessions.end_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Box>
              </Grid>
              {/* <Grid item xs={3}>
                <Chip
                  label={
                    archivesessions.status === "Confirmed"
                      ? "Confirmed"
                        : archivesessions.status === "Pending"
                  }
                  variant="outlined"
                  color={
                    archivesessions.status === "Confirmed"
                      ? "success"
                        : archivesessions.status === "Pending"
                  }
                  size="md"
                  sx={{ margin: ".25rem" }}
                ></Chip>
              </Grid> */}
            </Grid>
        )}
      </Box>
    </Box>
  );
}
