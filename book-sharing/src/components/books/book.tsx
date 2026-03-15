
type Book = {
    title: string;
    author: string;
    like: number;
}
// write props
export function Book({title = "TestTitle", author = "TestAuthor", like = 100}: Book) {

    return (
        <>
            <h2>{title}</h2>
            <h2>{author}</h2>
            <h2>{like}</h2>
        </>
    )

}