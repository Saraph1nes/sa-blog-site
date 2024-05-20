import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub.js";
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import LinkIcon from '@mui/icons-material/Link';
import PropTypes from "prop-types";

const ProjectList = ({dataset = []}) => {
  return <div className="my-project-list">
    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
      {
        dataset.map(project =>
          <Grid item xs={12} sm={4} md={4} key={project.name}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                sx={{height: 140}}
                image={project.img}
                title={project.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.desc}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                {
                  project.githubLink &&
                  <IconButton aria-label="github-link" href={project.githubLink} target='_blank'>
                    <GitHubIcon/>
                  </IconButton>
                }
                {
                  project.microsoftLink &&
                  <IconButton aria-label="microsoft-link" href={project.microsoftLink} target='_blank'>
                    <MicrosoftIcon/>
                  </IconButton>
                }
                {
                  project.outerLink &&
                  <IconButton aria-label="outer-link" href={project.outerLink} target='_blank'>
                    <LinkIcon/>
                  </IconButton>
                }
              </CardActions>
            </Card>
          </Grid>
        )
      }
    </Grid>
  </div>
}

ProjectList.propTypes = {
  dataset: PropTypes.array
}

export default ProjectList
