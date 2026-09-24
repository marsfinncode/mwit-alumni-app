.class Lcom/moust/cordova/videoplayer/VideoPlayer$2;
.super Ljava/lang/Object;
.source "VideoPlayer.java"

# interfaces
.implements Landroid/view/SurfaceHolder$Callback;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/moust/cordova/videoplayer/VideoPlayer;->openVideoDialog(Ljava/lang/String;Lorg/json/JSONObject;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/moust/cordova/videoplayer/VideoPlayer;


# direct methods
.method constructor <init>(Lcom/moust/cordova/videoplayer/VideoPlayer;)V
    .locals 0
    .param p1, "this$0"    # Lcom/moust/cordova/videoplayer/VideoPlayer;

    .prologue
    .line 212
    iput-object p1, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$2;->this$0:Lcom/moust/cordova/videoplayer/VideoPlayer;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public surfaceChanged(Landroid/view/SurfaceHolder;III)V
    .locals 0
    .param p1, "holder"    # Landroid/view/SurfaceHolder;
    .param p2, "format"    # I
    .param p3, "width"    # I
    .param p4, "height"    # I

    .prologue
    .line 230
    return-void
.end method

.method public surfaceCreated(Landroid/view/SurfaceHolder;)V
    .locals 4
    .param p1, "holder"    # Landroid/view/SurfaceHolder;

    .prologue
    .line 215
    iget-object v2, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$2;->this$0:Lcom/moust/cordova/videoplayer/VideoPlayer;

    invoke-static {v2}, Lcom/moust/cordova/videoplayer/VideoPlayer;->access$000(Lcom/moust/cordova/videoplayer/VideoPlayer;)Landroid/media/MediaPlayer;

    move-result-object v2

    invoke-virtual {v2, p1}, Landroid/media/MediaPlayer;->setDisplay(Landroid/view/SurfaceHolder;)V

    .line 217
    :try_start_0
    iget-object v2, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$2;->this$0:Lcom/moust/cordova/videoplayer/VideoPlayer;

    invoke-static {v2}, Lcom/moust/cordova/videoplayer/VideoPlayer;->access$000(Lcom/moust/cordova/videoplayer/VideoPlayer;)Landroid/media/MediaPlayer;

    move-result-object v2

    invoke-virtual {v2}, Landroid/media/MediaPlayer;->prepare()V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    .line 224
    :goto_0
    return-void

    .line 218
    :catch_0
    move-exception v0

    .line 219
    .local v0, "e":Ljava/lang/Exception;
    new-instance v1, Lorg/apache/cordova/PluginResult;

    sget-object v2, Lorg/apache/cordova/PluginResult$Status;->ERROR:Lorg/apache/cordova/PluginResult$Status;

    invoke-virtual {v0}, Ljava/lang/Exception;->getLocalizedMessage()Ljava/lang/String;

    move-result-object v3

    invoke-direct {v1, v2, v3}, Lorg/apache/cordova/PluginResult;-><init>(Lorg/apache/cordova/PluginResult$Status;Ljava/lang/String;)V

    .line 220
    .local v1, "result":Lorg/apache/cordova/PluginResult;
    const/4 v2, 0x0

    invoke-virtual {v1, v2}, Lorg/apache/cordova/PluginResult;->setKeepCallback(Z)V

    .line 221
    iget-object v2, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$2;->this$0:Lcom/moust/cordova/videoplayer/VideoPlayer;

    invoke-static {v2}, Lcom/moust/cordova/videoplayer/VideoPlayer;->access$100(Lcom/moust/cordova/videoplayer/VideoPlayer;)Lorg/apache/cordova/CallbackContext;

    move-result-object v2

    invoke-virtual {v2, v1}, Lorg/apache/cordova/CallbackContext;->sendPluginResult(Lorg/apache/cordova/PluginResult;)V

    .line 222
    iget-object v2, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$2;->this$0:Lcom/moust/cordova/videoplayer/VideoPlayer;

    const/4 v3, 0x0

    invoke-static {v2, v3}, Lcom/moust/cordova/videoplayer/VideoPlayer;->access$102(Lcom/moust/cordova/videoplayer/VideoPlayer;Lorg/apache/cordova/CallbackContext;)Lorg/apache/cordova/CallbackContext;

    goto :goto_0
.end method

.method public surfaceDestroyed(Landroid/view/SurfaceHolder;)V
    .locals 1
    .param p1, "holder"    # Landroid/view/SurfaceHolder;

    .prologue
    .line 227
    iget-object v0, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$2;->this$0:Lcom/moust/cordova/videoplayer/VideoPlayer;

    invoke-static {v0}, Lcom/moust/cordova/videoplayer/VideoPlayer;->access$000(Lcom/moust/cordova/videoplayer/VideoPlayer;)Landroid/media/MediaPlayer;

    move-result-object v0

    invoke-virtual {v0}, Landroid/media/MediaPlayer;->release()V

    .line 228
    return-void
.end method
