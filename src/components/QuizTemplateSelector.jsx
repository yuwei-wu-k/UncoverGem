import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

function QuizTemplateSelector({ onTemplateSelect, quizTemplates }) {
  return (
    <List>
      {quizTemplates.length === 0 ? (
        <p>No templates available</p>
      ) : (
        quizTemplates.map((template) => (
          <ListItem key={template.id}>
            <ListItemText primary={template.title ? template.title : ""} />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onTemplateSelect(template.questions)}
              >
                Use this template
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      )}
    </List>
  );
}

export default QuizTemplateSelector;
