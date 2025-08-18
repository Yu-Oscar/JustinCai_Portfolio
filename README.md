## 📝 How to Update Your Portfolio Videos

### 1. Navigate to the Data File

- Go to the `public/data` folder in this repository
- Click on the file called `youtubeVideos.json`
- Click the pencil icon (✏️) in the top-right corner to edit the file

### 2. Understanding the Video Structure

Each video in your portfolio has this format:

```json
{
  "videoUrl": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  "category": "category-name",
  "isVertical": true
}
```

### 3. Adding New Videos

To add a new video:

1. **Get the YouTube URL**: Copy the full URL from your YouTube video
2. **Choose a category**: You can use any category name you want. Here are some examples:

   - `marketing` - For marketing and strategy videos
   - `branding` - For branding and identity videos

   Feel free to create your own categories that match your work!

3. **Set vertical orientation**:
   - Use `"isVertical": true` for YouTube Shorts or vertical videos
   - Use `"isVertical": false` or omit this line for regular horizontal videos

### 4. Example of Adding a New Video

Add your new video entry to the `videos` array:

```json
{
  "videos": [
    // ... existing videos ...
    {
      "videoUrl": "https://www.youtube.com/watch?v=EXISTING_VIDEO_ID",
      "category": "category",
      "isVertical": true
    },
    {
      "videoUrl": "https://www.youtube.com/watch?v=YOUR_NEW_VIDEO_ID",
      "category": "marketing",
      "isVertical": false
    }
  ]
}
```

**Important**: Don't forget to add a comma after the previous video entry, but don't add a comma after the last entry in the array

### 5. Removing Videos

To remove a video, simply delete its entire entry from the `videos` array.

### 6. Reordering Videos

You can change the order of videos by moving their entries up or down in the `videos` array. Videos appear on the website in the same order they appear in this file.

## 🔄 Publishing Updates

After editing the `youtubeVideos.json` file in GitHub:

1. **Click the green "Commit changes" button on the top right**
2. **Click the green "Commit changes" button in the pop-up**

The changes will automatically appear on your live website once the commit is complete!

