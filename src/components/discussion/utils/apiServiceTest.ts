
import {
  getDiscussionsByTableNameAndRow,
  getPostsByDiscussionId,
  getReactionsByPostId,
  createDiscusion,
  createPost,
  createReaction,
  deleteDiscussion,
  deletePost,
  deleteReaction,
} from "src/components/discussion/utils/apiService";

export async function testApiService() {
  console.log("__create__");
  
  console.log("create discussion");
  const discussion_1 = await createDiscusion("table_name_1", 1);
  const discussion_2 = await createDiscusion("table_name_2", 2);
  const discussion_3 = await createDiscusion("table_name_3", 3);
  console.log([discussion_1, discussion_2, discussion_3]);

  console.log("create post");
  const discusionId = discussion_1.data ? discussion_1.data.id : 0;
  const post_1 = await createPost(discusionId, "Super User", "quill_text_1");
  const post_2 = await createPost(discusionId, "Super User", "quill_text_2");
  const post_3 = await createPost(discusionId, "Super User", "quill_text_3");
  console.log([post_1, post_2, post_3]);

  console.log('create reaction');
  const postId = post_1.data ? post_1.data.id : 0;

  console.log(postId);

  const reaction_1 = await createReaction(postId, "Super User", "content1");
  const reaction_2 = await createReaction(postId, "Super User", "content2");
  const reaction_3 = await createReaction(postId, "Super User", "content3");
  console.log([reaction_1, reaction_2, reaction_3]);

  console.log("__get__");

  console.log("get discussion by table name & row");
  console.log(await getDiscussionsByTableNameAndRow('table_name_1', 1));

  console.log('get post by discussion id');
  console.log(await getPostsByDiscussionId(discusionId));

  console.log("get reactions by post id");
  console.log(await getReactionsByPostId(postId));

  console.log("__delete__ one by one");

  console.log(await deleteReaction(reaction_2.data ? reaction_2.data.id : 0));
  console.log(await deletePost(post_2.data ? post_2.data.id : 0));
  console.log(await deleteDiscussion(discussion_2.data ? discussion_2.data.id : 0));

  console.log("__delete__ check deletable");

  console.log("reaction deletable");
  console.log(await getReactionsByPostId(postId));

  console.log("post deletable");
  console.log(await getPostsByDiscussionId(discusionId));

  console.log("discussion deletable");
  console.log(await getDiscussionsByTableNameAndRow('table_name_2', 2));

  console.log("__delete__ check cascade deletable");

  console.log("post vs reaction");
  await deletePost(postId);
  console.log(await getReactionsByPostId(postId));

  console.log("discussion vs post");
  await deleteDiscussion(discusionId);
  console.log(await getPostsByDiscussionId(discusionId));
}