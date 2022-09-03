import { Typography } from "@mui/material";
import React from "react";

export const YoutubeEmbed = ({ embedId }) => (
  <>
  <Typography        
        variant="h4"
        sx={{
          textAlign: 'center',
          mb: 2,
          pt: 2,
        }}>Как работает приложение</Typography>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="20"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube" />
  </>
  
);
