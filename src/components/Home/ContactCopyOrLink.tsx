import {IconButton, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface ContactCopyOrLinkProps {
    contact: string;
    onClickCopy: (text: string) => void;
}

export const ContactCopyOrLink = ({contact, onClickCopy}: ContactCopyOrLinkProps) => {
    return (
        <>
            {contact.includes("https") ?
                <Link href={contact} target={"_blank"}>
                    <Typography>
                        {contact}
                    </Typography>
                </Link> : <div className={"flex flex-row items-start"}>
                    <Typography>
                        {contact}
                    </Typography>
                    <IconButton aria-label="copy" size={"small"}
                                onClick={() => onClickCopy(contact)}>
                        <ContentCopyIcon fontSize={"inherit"}/>
                    </IconButton>
                </div>
            }
        </>
    );
};
