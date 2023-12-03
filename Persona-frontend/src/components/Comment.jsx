import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import {Link} from "react-router-dom";

const Comment = ({ reply, lastReply }) => {
	const mediaRegex = {
		youtube: /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
		spotify: /(?:https?:\/\/)?(?:www\.)?open\.spotify\.com\/track\/([a-zA-Z0-9_-]+)/,
	  };
	
	  const updatedText = reply.text.replace(mediaRegex.youtube, (match, youtubeId) => {
		return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen></iframe>`;
	  }).replace(mediaRegex.spotify, (match, spotifyId) => {
		return `<iframe src="https://open.spotify.com/embed/track/${spotifyId}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
	  });

	return (
		<>
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Link to={`/${reply.username}`}>
					<Avatar src={reply.userProfilePic} size={"md"} name={reply.username}/>
				</Link>
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{reply.username}
						</Text>
					</Flex>
					<Text dangerouslySetInnerHTML={{ __html: updatedText }} />
				</Flex>
			</Flex>
			{!lastReply ? <Divider /> : null}
		</>
	);
};

export default Comment;