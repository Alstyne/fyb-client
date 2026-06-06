import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  getFeedPosts, createPost, deletePost,
  togglePostLike, getPostComments,
  addPostComment, deletePostComment,
} from '../services/api';
import { uploadMemoryImage } from '../services/api';
import PageWrapper from '../components/PageWrapper';
import toast from 'react-hot-toast';

// ── Icons ─────────────────────────────────────────────────────────
const Icons = {
  Heart: ({ filled, className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}
         stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
    </svg>
  ),
  Comment: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/>
    </svg>
  ),
  Image: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
    </svg>
  ),
  Close: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  ),
  Send: ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
    </svg>
  ),
  Trash: ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
    </svg>
  ),
  Expand: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
    </svg>
  ),
  Sparkles: ({ className = "w-12 h-12" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
    </svg>
  ),
  Share: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.287.705.287 1.093m0-1.093c-.18.324-.287.705-.287 1.093m0 0l9.043-3.963m0 0a2.25 2.25 0 10-2.186-4.218m2.186 4.218L7.217 10.907m9.043 3.963a2.25 2.25 0 102.186 4.218m-2.186-4.218l2.186 4.218m0 0l-9.043-3.963m0 0a2.25 2.25 0 10-2.186 4.218m2.186-4.218L16.26 14.87m-2.186 4.218l-2.186-4.218"/>
    </svg>
  ),
};

// ── Avatar ───────────────────────────────────────────────────────
const Avatar = ({ src, name, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-ink to-gray-800
                     flex-shrink-0 flex items-center justify-center overflow-hidden
                     border border-gold/20 ring-2 ring-cream`}>
      {src
        ? <img src={src} alt={name} className="w-full h-full object-cover" />
        : <span className="text-gold/80 font-bold font-display">{name?.charAt(0)?.toUpperCase()}</span>
      }
    </div>
  );
};

// ── Time formatter ────────────────────────────────────────────────
const timeAgo = (date) => {
  const diff = (Date.now() - new Date(date)) / 1000;
  if (diff < 60)    return 'Just now';
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

// ── Post Card ────────────────────────────────────────────────────
const PostCard = ({ post, currentUser, onDelete, onLike }) => {
  const [comments, setComments]         = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText]   = useState('');
  const [loadingComments, setLoading]   = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [lightbox, setLightbox]         = useState(false);
  const [likeAnim, setLikeAnim]         = useState(false);
  const commentRef = useRef();

  const isOwner = currentUser?.id === post.user_id;
  const isAdmin = currentUser?.role === 'admin';

  const loadComments = async () => {
    if (showComments) { setShowComments(false); return; }
    setLoading(true);
    try {
      const res = await getPostComments(post.id);
      setComments(res.data.comments);
      setShowComments(true);
      setTimeout(() => commentRef.current?.focus(), 300);
    } catch { toast.error('Failed to load comments.'); }
    finally { setLoading(false); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const res = await addPostComment({ post_id: post.id, comment: commentText });
      setComments(prev => [...prev, res.data.comment]);
      setCommentText('');
    } catch { toast.error('Failed to post comment.'); }
    finally { setSubmitting(false); }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deletePostComment(id);
      setComments(prev => prev.filter(c => c.id !== id));
    } catch { toast.error('Failed.'); }
  };

  const handleLikeClick = () => {
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 600);
    onLike(post.id);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/feed?post=${post.id}`;
    const shareData = {
      title: `Post by ${post.name}`,
      text: post.content?.slice(0, 100) || 'Check out this post!',
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        toast.error('Failed to share.');
      }
    }
  };

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && post.image_url && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-50 bg-ink/98 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              src={post.image_url} alt=""
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <button onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-cream/10 backdrop-blur-md
                         rounded-full flex items-center justify-center text-cream
                         hover:bg-cream/20 transition-colors border border-cream/10">
              <Icons.Close className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="group bg-white rounded-2xl overflow-hidden
                   border border-gray-100 hover:border-gold/20
                   hover:shadow-lg hover:shadow-gold/5
                   transition-all duration-300"
      >
        {/* Post Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <Link to={`/profile/${post.user_id}`}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity min-w-0">
            <Avatar src={post.profile_image} name={post.name} />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-ink truncate">{post.name}</div>
              <div className="flex items-center gap-1.5 text-xs mt-0.5">
                {post.nickname && (
                  <span className="text-gold font-medium truncate max-w-[100px]">
                    "{post.nickname}"
                  </span>
                )}
                <span className="text-gray-400">·</span>
                <span className="text-gray-400 truncate">{post.department}</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-400">{timeAgo(post.created_at)}</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-1 flex-shrink-0">
            {(isOwner || isAdmin) && (
              <button onClick={() => onDelete(post.id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center
                           text-gray-300 hover:text-red-500 hover:bg-red-50
                           transition-all opacity-0 group-hover:opacity-100">
                <Icons.Trash />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {post.content && (
          <div className="px-5 pb-4">
            <p className="text-ink/80 text-sm leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        )}

        {/* Image */}
        {post.image_url && (
          <div className="relative mx-5 mb-5 rounded-xl overflow-hidden cursor-zoom-in bg-gray-50"
               onClick={() => setLightbox(true)}>
            <img src={post.image_url} alt=""
              className="w-full max-h-[500px] object-cover hover:scale-[1.02]
                         transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors
                            flex items-end justify-end p-3">
              <div className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-lg
                              flex items-center justify-center text-white/80
                              opacity-0 group-hover:opacity-100 transition-all duration-200
                              hover:bg-black/60">
                <Icons.Expand className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="px-5 py-3 flex items-center gap-6 border-t border-gray-100">
          {/* Like */}
          <button onClick={handleLikeClick}
            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200
                        ${post.liked
                          ? 'text-red-500'
                          : 'text-gray-400 hover:text-red-400'
                        }`}>
            <motion.span
              animate={likeAnim ? { scale: [1, 1.35, 0.95, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}>
              <Icons.Heart filled={post.liked} />
            </motion.span>
            <span className="tabular-nums">{post.like_count || 0}</span>
          </button>

          {/* Comment */}
          <button onClick={loadComments}
            className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200
                        ${showComments
                          ? 'text-gold'
                          : 'text-gray-400 hover:text-ink'
                        }`}>
            <Icons.Comment />
            <span className="tabular-nums">
              {post.comment_count || 0}{loadingComments ? '…' : ''}
            </span>
          </button>

          {/* Share */}
          <button onClick={handleShare}
            className="flex items-center gap-2 text-sm font-medium text-gray-400
                       hover:text-gold transition-colors duration-200 ml-auto">
            <Icons.Share className="w-5 h-5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-gray-100 bg-gray-50/50"
            >
              <div className="px-5 py-4 space-y-3">
                {/* Comment list */}
                {comments.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-400 font-medium">No comments yet</p>
                    <p className="text-xs text-gray-300 mt-1">Be the first to share your thoughts</p>
                  </div>
                )}
                {comments.map((c, i) => (
                  <motion.div 
                    key={c.id} 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 group/comment"
                  >
                    <Link to={`/profile/${c.user_id}`} className="flex-shrink-0">
                      <Avatar src={c.profile_image || c.commenter_image}
                              name={c.name || c.commenter_name} size="sm" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="bg-white rounded-xl px-4 py-2.5 border border-gray-100
                                      shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                          <Link to={`/profile/${c.user_id}`}>
                            <span className="text-xs font-semibold text-ink hover:text-gold transition-colors">
                              {c.nickname || c.name || c.commenter_name}
                            </span>
                          </Link>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-[10px] text-gray-300">{timeAgo(c.created_at)}</span>
                            {(currentUser?.id === c.user_id || isAdmin) && (
                              <button onClick={() => handleDeleteComment(c.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors
                                           opacity-0 group-hover/comment:opacity-100">
                                <Icons.Trash className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {c.comment}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Add comment */}
                <form onSubmit={handleComment} className="flex gap-3 pt-2">
                  <Avatar src={currentUser?.profile_image} name={currentUser?.name} size="sm" />
                  <div className="flex-1 flex items-center gap-2 bg-white
                                  border border-gray-200 rounded-xl px-4 py-2.5
                                  focus-within:border-gold/50 focus-within:shadow-sm
                                  transition-all duration-200">
                    <input
                      ref={commentRef}
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 bg-transparent text-sm text-ink
                                 outline-none placeholder-gray-300"
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleComment(e); }}
                    />
                    <button type="submit"
                      disabled={submitting || !commentText.trim()}
                      className="text-gold hover:text-ink transition-colors
                                 disabled:opacity-30 disabled:hover:text-gold flex-shrink-0">
                      <Icons.Send />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </>
  );
};

// ── Compose Box ──────────────────────────────────────────────────
const ComposeBox = ({ user, onPost }) => {
  const [content, setContent]     = useState('');
  const [imageUrl, setImageUrl]   = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmit]   = useState(false);
  const [focused, setFocused]     = useState(false);
  const fileRef = useRef();

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await uploadMemoryImage(fd);
      setImageUrl(res.data.url);
      toast.success('Image ready!');
    } catch { toast.error('Image upload failed.'); }
    finally { setUploading(false); }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim() && !imageUrl) return toast.error('Write something or add a photo first.');
    setSubmit(true);
    try {
      const res = await createPost({ content, image_url: imageUrl || null });
      onPost(res.data.post);
      setContent('');
      setImageUrl('');
      setFocused(false);
      toast.success('Posted!');
    } catch { toast.error('Failed to post.'); }
    finally { setSubmit(false); }
  };

  return (
    <div className={`bg-white border rounded-2xl p-5 transition-all duration-300
                     ${focused ? 'border-gold/40 shadow-lg shadow-gold/5' : 'border-gray-100'}`}>
      <div className="flex items-start gap-4">
        <Avatar src={user?.profile_image} name={user?.name} />

        <div className="flex-1 space-y-4">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'classmate'}?`}
            rows={focused ? 4 : 2}
            className="w-full bg-transparent text-sm text-ink
                       outline-none placeholder-gray-300 resize-none
                       transition-all duration-300 leading-relaxed"
          />

          {/* Image preview */}
          <AnimatePresence>
            {imageUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden">
                <img src={imageUrl} alt="" className="w-full max-h-64 object-cover" />
                <button type="button" onClick={() => setImageUrl('')}
                  className="absolute top-3 right-3 w-8 h-8 bg-ink/70 backdrop-blur-sm
                             rounded-full flex items-center justify-center text-cream
                             hover:bg-ink transition-colors border border-cream/10">
                  <Icons.Close className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toolbar + Submit */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg
                           text-gray-500 hover:text-gold hover:bg-gold/5
                           transition-all disabled:opacity-40 border border-transparent
                           hover:border-gold/20">
                <Icons.Image className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Add Photo'}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => handleImageUpload(e.target.files[0])} />
            </div>

            <div className="flex items-center gap-3">
              {content.length > 0 && (
                <span className={`text-xs tabular-nums font-medium
                                  ${content.length > 450 ? 'text-red-500' : 'text-gray-300'}`}>
                  {500 - content.length}
                </span>
              )}
              <button onClick={handlePost}
                disabled={submitting || (!content.trim() && !imageUrl)}
                className="px-6 py-2.5 bg-ink text-cream text-xs font-semibold
                           rounded-xl hover:bg-ink/90 active:scale-95
                           transition-all disabled:opacity-40 disabled:hover:bg-ink
                           shadow-lg shadow-ink/20">
                {submitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Skeleton ─────────────────────────────────────────────────────
const PostSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 animate-pulse">
    <div className="flex gap-3 items-center">
      <div className="w-10 h-10 rounded-full bg-gray-100" />
      <div className="space-y-2 flex-1">
        <div className="h-3.5 bg-gray-100 rounded-lg w-32" />
        <div className="h-2.5 bg-gray-100 rounded-lg w-20" />
      </div>
    </div>
    <div className="space-y-2.5">
      <div className="h-3 bg-gray-100 rounded-lg w-full" />
      <div className="h-3 bg-gray-100 rounded-lg w-4/5" />
      <div className="h-3 bg-gray-100 rounded-lg w-2/3" />
    </div>
    <div className="h-48 bg-gray-100 rounded-xl" />
  </div>
);

// ── Empty State ──────────────────────────────────────────────────
const EmptyState = ({ filter }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-20"
  >
    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-50 
                    flex items-center justify-center border border-gray-100">
      <Icons.Sparkles className="w-8 h-8 text-gold/40" />
    </div>
    <h3 className="font-display text-2xl text-ink">
      {filter !== 'all' ? `No ${filter} posts yet` : 'No posts yet'}
    </h3>
    <p className="font-body text-sm text-gray-400 mt-2 max-w-xs mx-auto">
      {filter !== 'all' 
        ? `Be the first to share a ${filter === 'photos' ? 'photo' : 'text post'} with the class!`
        : 'Start the conversation. Share a memory, photo, or shoutout with your classmates.'}
    </p>
  </motion.div>
);

// ── Main Feed Page ────────────────────────────────────────────────
const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('all');

  useEffect(() => {
    // Load fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getFeedPosts();
      setPosts(res.data.posts);
    } catch { toast.error('Failed to load feed.'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      toast.success('Deleted.');
    } catch { toast.error('Failed.'); }
  };

  const handleLike = async (postId) => {
    try {
      const res = await togglePostLike({ post_id: postId });
      setPosts(prev => prev.map(p =>
        p.id === postId
          ? { ...p, liked: res.data.liked, like_count: res.data.like_count }
          : p
      ));
    } catch { toast.error('Failed.'); }
  };

  const handleNewPost = useCallback((post) => {
    setPosts(prev => [post, ...prev]);
  }, []);

  const filtered = posts.filter(p =>
    filter === 'photos' ? !!p.image_url :
    filter === 'text'   ? !p.image_url  : true
  );

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#faf9f6]"
           style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* ═══════════════════════════════════════════════════════════
            HERO HEADER
        ═══════════════════════════════════════════════════════════ */}
        <div className="relative bg-ink overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          
          {/* Decorative orbs */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gold/3 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="text-center">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="font-body text-gold/80 text-[11px] uppercase tracking-[0.35em] mb-3"
              >
                Class of 2026
              </motion.p>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl sm:text-6xl md:text-7xl text-cream leading-[0.9] tracking-tight"
              >
                The <span className="text-gold">Feed</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-body text-cream/40 text-sm sm:text-base mt-5 max-w-md mx-auto leading-relaxed"
              >
                Share moments, celebrate milestones, and keep the conversation going with your coursemates.
              </motion.p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            MAIN CONTENT
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">

          {/* Compose */}
          <ComposeBox user={user} onPost={handleNewPost} />

          {/* Filter Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              {[
                { key: 'all',    label: 'All Posts' },
                { key: 'photos', label: 'Photos' },
                { key: 'text',   label: 'Text' },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setFilter(key)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200
                              ${filter === key
                                ? 'bg-ink text-cream shadow-md'
                                : 'text-gray-400 hover:text-ink hover:bg-gray-50'
                              }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] text-gray-300 uppercase tracking-[0.2em] font-medium">
              {filter === 'all' ? 'Latest' : filter === 'photos' ? 'Photos' : 'Text Posts'}
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Posts */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => <PostSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            <div className="space-y-6">
              {filtered.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUser={user}
                  onDelete={handleDelete}
                  onLike={handleLike}
                />
              ))}
            </div>
          )}

          {/* Bottom spacer */}
          <div className="h-20" />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Feed;