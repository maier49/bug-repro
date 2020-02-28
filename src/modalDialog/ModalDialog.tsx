import { tsx, create } from "@dojo/framework/core/vdom";
import theme from "@dojo/framework/core/middleware/theme";
import Dialog from "@dojo/widgets/dialog";
import * as css from "./ModalDialog.m.css";

export interface ModalDialogProperties {
  open: boolean;
  title?: string;
  prompt?: string;
  buttons?: DialogButtons;
  acceptButtonText?: string;
  cancelButtonText?: string;
  canAccept?: () => boolean;
  canCancel?: boolean;
  onAccept?: () => void;
  onCancel?: () => void;
}

export enum DialogButtons {
  Accept = 0x01,
  Cancel = 0x02
}

const factory = create({ theme }).properties<ModalDialogProperties>();

export const ModalDialog = factory(function modalDialog({
  properties,
  children,
  middleware: { theme }
}) {
  const {
    prompt = "",
    open,
    title = "",
    buttons: buttonsContainer = DialogButtons.Accept,
    canAccept = true,
    onAccept = () => {},
    acceptButtonText = "OK",
    canCancel = true,
    onCancel = () => {},
    cancelButtonText = "Cancel"
  } = properties();

  const showAcceptButton =
    (buttonsContainer & DialogButtons.Accept) === DialogButtons.Accept &&
    canAccept;
  const showCancelButton =
    (buttonsContainer & DialogButtons.Cancel) === DialogButtons.Cancel &&
    canCancel;

  const {
    content,
    contentStyle,
    promptStyle,
    button,
    buttons,
    buttonsStyle,
    buttonStyle,
    acceptButton,
    cancelButton
  } = theme.classes(css);

  return (
    <Dialog
      open={open}
      title={title}
      modal={true}
      underlay={true}
      closeable={canCancel}
      onRequestClose={onCancel}
    >
      <div classes={[content, contentStyle]}>
        {prompt != "" ? (
          <div classes={[promptStyle]}>{[prompt]}</div>
        ) : (
          children()
        )}
      </div>
      <div classes={[buttons, buttonsStyle]}>
        {showAcceptButton ? (
          <button
            classes={[button, buttonStyle, acceptButton]}
            onclick={onAccept}
            disabled={!canAccept}
          >
            {[acceptButtonText]}
          </button>
        ) : null}
        {showCancelButton ? (
          <button
            classes={[button, buttonStyle, cancelButton]}
            disabled={!canCancel}
            onclick={onCancel}
          >
            {[cancelButtonText]}
          </button>
        ) : null}
      </div>
    </Dialog>
  );
});
