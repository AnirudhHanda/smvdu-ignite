import React from 'react';

const NewQuestionContainer = () => {
    return (
        <div>
            {/* Main Content */}
            <main>
                <div className="container">
                    <div className="all-comments-container"></div>

                    {/* New comment */}
                    <div className="write-comment new-comment">
                        <div className="write-comment-avatar">
                            <img
                                src="./images/avatars/image-juliusomo.png"
                                alt="Juliusomo's photo"
                            />
                        </div>

                        <textarea
                            className="write-comment-field write-main-comment-field"
                            rows="3"
                            placeholder="Add a comment..."
                        ></textarea>

                        <button
                            className="write-comment-btn write-main-comment-btn"
                            type="button"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NewQuestionContainer;
