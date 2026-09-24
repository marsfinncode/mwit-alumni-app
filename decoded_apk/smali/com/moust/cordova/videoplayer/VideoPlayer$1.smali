.class Lcom/moust/cordova/videoplayer/VideoPlayer$1;
.super Ljava/lang/Object;
.source "VideoPlayer.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/moust/cordova/videoplayer/VideoPlayer;->execute(Ljava/lang/String;Lorg/apache/cordova/CordovaArgs;Lorg/apache/cordova/CallbackContext;)Z
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/moust/cordova/videoplayer/VideoPlayer;

.field final synthetic val$options:Lorg/json/JSONObject;

.field final synthetic val$path:Ljava/lang/String;


# direct methods
.method constructor <init>(Lcom/moust/cordova/videoplayer/VideoPlayer;Ljava/lang/String;Lorg/json/JSONObject;)V
    .locals 0
    .param p1, "this$0"    # Lcom/moust/cordova/videoplayer/VideoPlayer;

    .prologue
    .line 75
    iput-object p1, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$1;->this$0:Lcom/moust/cordova/videoplayer/VideoPlayer;

    iput-object p2, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$1;->val$path:Ljava/lang/String;

    iput-object p3, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$1;->val$options:Lorg/json/JSONObject;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 3

    .prologue
    .line 77
    iget-object v0, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$1;->this$0:Lcom/moust/cordova/videoplayer/VideoPlayer;

    iget-object v1, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$1;->val$path:Ljava/lang/String;

    iget-object v2, p0, Lcom/moust/cordova/videoplayer/VideoPlayer$1;->val$options:Lorg/json/JSONObject;

    invoke-virtual {v0, v1, v2}, Lcom/moust/cordova/videoplayer/VideoPlayer;->openVideoDialog(Ljava/lang/String;Lorg/json/JSONObject;)V

    .line 78
    return-void
.end method
