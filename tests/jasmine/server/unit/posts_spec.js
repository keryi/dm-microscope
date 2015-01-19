describe("Post", function () {
    it("should be created with title and url", function () {
        spyOn(Posts, "insert");
 
        var post = {
          title: "New Post",
          url: "http://www.google.com"
        }

        Posts.insert(post);
 
        expect(Posts.insert).toHaveBeenCalledWith({
          title: "New Post",
          url: "http://www.google.com"
        });
    });
});